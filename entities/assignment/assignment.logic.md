Let $
    P_u=\{-1,0,1\}^7
$
be user $u$'s preferences for a given week, such that:
$
    P_u[i]=-1 \iff u \text{ prefers not day }i
$
$
    P_u[i]=0 \iff u \text{ has no preference regarding day }i
$

Denote $m_u:=|\{P_u[i]~|~P_u[i]=-1\}|$ as the amount of negative preferences of user $u$

Let $R_u=\mathbb{Z}^7$ be user $u$'s preference priority for a given week such that a higher value of R means it has higher priority. 

$
    P_u[i]=-1 \iff u \text{ prefers day }i
$


Let $
    S_u\in\mathbb{R}
$
be user $u$'s score.

We wish to find assignment $A\in U^7$.

Let $i\in\{0...6\}$.

Define $O_i$ as an ordering of $U$ in the following fashion:
1.  descending by value of $P_u[i]$
2.  descending by the value of $S_u$
3.  descending by the value of $R_u[i]$
4.  ascending by $|\{P_u[j]~|~P_u[j]=-1\}|$

We define $A$ as:
$
    A[i]:=O_i[0]
$

For all $i$ we have $A[i]=u$ iff:
1.  among all users, $u$ prefers day $i$ the most.
2.  among all users with same preference of day $i$, $u$ has the highest score.
3.  among all users with the same preference of day $i$ and the same score as $u$, $u$'s preference has highest priority.
4.  among all users with the same preference of day $i$, the same score as $u$ and the same priority as $u$'s preference, $u$ has the least amount of negative preferences for this week.

Let $
    \pi_i := max_{u\in U}P_u[i]
$ and $
    \Pi_i := \{u~|~P_u[i]=\pi_i\}
$

Let $
    \sigma_i := max_{u\in \Pi_i}S_u
$ and $
    \Sigma_i := \{u~|~u\in \Pi_i \wedge S_u=\sigma_i\}
$

Let $
    \rho_i := max_{u\in \Sigma_i}R_u[i]
$ and $
    \Rho_i := \{u~|~ u\in \Sigma_i \wedge P_u[i]=\rho_i\}
$

Let $
    \mu_i := min_{u\in \Rho_i}m_u
$ and $
    \Mu_i := \{u~|~ u\in \Rho_i \wedge m_u=\mu_i\}
$

Note that we have: $
    \Mu_i \subseteq
    \Rho_i \subseteq
    \Sigma_i \subseteq
    \Pi_i 
$